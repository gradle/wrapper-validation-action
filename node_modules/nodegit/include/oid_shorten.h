// This is a generated file, modify: generate/templates/templates/class_header.h

#ifndef GITOIDSHORTEN_H
#define GITOIDSHORTEN_H
#include <nan.h>
#include <string>
#include <queue>
#include <utility>
#include <unordered_map>
#include <sstream>

#include "async_baton.h"
#include "nodegit_wrapper.h"
#include "promise_completion.h"
#include "reference_counter.h"

extern "C" {
#include <git2.h>
}

#include "../include/typedefs.h"

// Forward declaration.
struct git_oid_shorten {
};

using namespace node;
using namespace v8;

class GitOidShorten;

struct GitOidShortenTraits {
  typedef GitOidShorten cppClass;
  typedef git_oid_shorten cType;

  static const bool isDuplicable = false;
  static void duplicate(git_oid_shorten **dest, git_oid_shorten *src) {
     Nan::ThrowError("duplicate called on GitOidShorten which cannot be duplicated");
   }

  static const bool isSingleton = false;
  static const bool isFreeable = true;
  static void free(git_oid_shorten *raw) {
    unsigned long referenceCount = 0;
     if (referenceCount == 0) {
      ::git_oid_shorten_free(raw); // :: to avoid calling this free recursively
    }
   }
};

class GitOidShorten : public
  NodeGitWrapper<GitOidShortenTraits>
{
    // grant full access to base class
    friend class NodeGitWrapper<GitOidShortenTraits>;
   public:
    static void InitializeComponent (v8::Local<v8::Object> target);

        

  private:
    GitOidShorten()
      : NodeGitWrapper<GitOidShortenTraits>(
           "A new GitOidShorten cannot be instantiated."
       )
    {}
    GitOidShorten(git_oid_shorten *raw, bool selfFreeing, v8::Local<v8::Object> owner = v8::Local<v8::Object>())
      : NodeGitWrapper<GitOidShortenTraits>(raw, selfFreeing, owner)
    {}
    ~GitOidShorten();
        
    static NAN_METHOD(Add);

    static NAN_METHOD(Create);
};

#endif
