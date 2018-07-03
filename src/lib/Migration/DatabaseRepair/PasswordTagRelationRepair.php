<?php
/**
 * This file is part of the Passwords App
 * created by Marius David Wieschollek
 * and licensed under the AGPL.
 */

namespace OCA\Passwords\Migration\DatabaseRepair;

use OCA\Passwords\Db\PasswordMapper;
use OCA\Passwords\Db\PasswordTagRelation;
use OCA\Passwords\Db\TagMapper;
use OCA\Passwords\Services\Object\PasswordTagRelationService;
use OCP\AppFramework\Db\DoesNotExistException;
use OCP\AppFramework\Db\MultipleObjectsReturnedException;
use OCP\Migration\IOutput;

/**
 * Class PasswordTagRelationRepair
 *
 * @package OCA\Passwords\Migration\DatabaseRepair
 */
class PasswordTagRelationRepair {

    /**
     * @var TagMapper
     */
    protected $tagMapper;

    /**
     * @var PasswordMapper
     */
    protected $passwordMapper;

    /**
     * @var PasswordTagRelationService
     */
    protected $relationService;

    /**
     * PasswordTagRelationRepair constructor.
     *
     * @param PasswordTagRelationService $relationService
     * @param PasswordMapper             $passwordMapper
     * @param TagMapper                  $tagMapper
     */
    public function __construct(PasswordTagRelationService $relationService, PasswordMapper $passwordMapper, TagMapper $tagMapper) {
        $this->relationService = $relationService;
        $this->passwordMapper  = $passwordMapper;
        $this->tagMapper       = $tagMapper;
    }

    /**
     * @param IOutput $output
     *
     * @throws \Exception
     */
    public function run(IOutput $output): void {
        /** @var PasswordTagRelation[] $allRelations */
        $allRelations = $this->relationService->findAll();

        $fixed = 0;
        $total = count($allRelations);
        $output->info("Checking {$total} password tag relations");
        $output->startProgress($total);
        foreach($allRelations as $relation) {
            try {
                if($this->repairRelation($relation)) $fixed++;
            } catch(\Throwable $e) {
                $output->warning(
                    "Failed to repair relation #{$relation->getId()}: {$e->getMessage()} in {$e->getFile()} line ".$e->getLine()
                );
            }
            $output->advance(1);
        }
        $output->finishProgress();
        $output->info("Fixed {$fixed} password tag relations");
    }

    /**
     * @param PasswordTagRelation $relation
     *
     * @return bool
     */
    protected function repairRelation(PasswordTagRelation $relation): bool {
        $fixed = false;

        try {
            $password = $this->passwordMapper->findByUuid($relation->getPassword());
            $tag      = $this->tagMapper->findByUuid($relation->getTag());

            if($password->getUserId() !== $relation->getUserId() || $tag->getUserId() !== $relation->getUserId()) {
                $relation->setDeleted(true);
                $fixed = true;
            }
        } catch(DoesNotExistException | MultipleObjectsReturnedException $e) {
            $relation->setDeleted(true);
            $fixed = true;
        }

        if($fixed) $this->relationService->save($relation);

        return $fixed;
    }
}